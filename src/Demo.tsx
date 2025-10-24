import { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// ⚠️ Storage seguro para sandbox/SSR: evita "setItem is not a function"
// En algunos entornos (SSR, sandbox) localStorage no existe o es incompatible.
// Usamos createWebStorage cuando hay window; en caso contrario, un storage NO-OP.
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route } from "react-router-dom";

/*********************************************\
|*  0) Storage seguro para redux-persist     *|
\*********************************************/

function createNoopStorage() {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    } as StorageLike;
}

type StorageLike = {
    getItem: (key: string) => Promise<any>;
    setItem: (key: string, value: any) => Promise<any>;
    removeItem: (key: string) => Promise<void>;
};

const storage: StorageLike = (typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage()) as unknown as StorageLike;

/*******************************\
|*  1) Redux: estado global     *|
\*******************************/

type Role = "guest" | "user" | "admin";
interface UserState {
    role: Role;
    name?: string;
    steps: Step[];
}

interface Step {
    id: number;
    name: string;
    enabled: boolean;
}

const initialSteps: Step[] = [
    { id: 0, name: "Registrar Producto", enabled: true },
    { id: 1, name: "Registrar Componentes", enabled: false },
    { id: 2, name: "Imprimir Etiqueta", enabled: false },
    { id: 3, name: "Validación de Calidad", enabled: false },
];

const initialState: UserState = {
    role: "guest",
    name: undefined,
    steps: initialSteps,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRole(state, action: PayloadAction<Role>) {
            state.role = action.payload;
        },
        setName(state, action: PayloadAction<string | undefined>) {
            state.name = action.payload;
        },
        enableStep(state, action: PayloadAction<number>) {
            const step = state.steps.find((s) => s.id === action.payload);
            if (step) step.enabled = true;
        },
        resetSteps(state) {
            state.steps = initialSteps.map((s) => ({ ...s }));
        },
    },
});

const { setRole, setName, enableStep, resetSteps } = userSlice.actions;

const persistConfig = {
    key: "root",
    storage: storage as any, // usa storage seguro
    // ⚙️ Opcional: define qué partes persistir
    whitelist: ["role", "name", "steps"],
};

const persistedReducer = persistReducer(persistConfig as any, userSlice.reducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

/****************************************\
|*  2) Componente externo con hooks      *|
\****************************************/

function ExternalWidget({ title }: { title: string }) {
    useEffect(() => {
        console.log(`[Widget] mounted: ${title}`);
        return () => console.log(`[Widget] unmounted: ${title}`);
    }, [title]);

    return (
        <div className="rounded-xl border p-4 shadow-sm">
            <h3 className="font-semibold">Widget externo</h3>
            <p className="opacity-80">{title}</p>
        </div>
    );
}

/****************************************\
|*  3) Interfaz base de Flow             *|
\****************************************/

interface FlowBase {
    render(): JSX.Element;
}

/****************************************\
|*  4) Guest Flow (login simple)         *|
\****************************************/

function GuestFlowView() {
    const dispatch = useDispatch();
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-bold">Bienvenido</h2>
            <ExternalWidget title="Noticias" />
            <div className="flex gap-2">
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setRole("user"))}>Entrar como Usuario</button>
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setRole("admin"))}>Entrar como Admin</button>
            </div>
        </div>
    );
}

class GuestFlow implements FlowBase {
    render(): JSX.Element {
        return (
            <Routes>
                <Route path="/" element={<GuestFlowView />} />
            </Routes>
        );
    }
}

/****************************************\
|*  5) Admin Flow (simple dashboard)     *|
\****************************************/

function AdminFlowView() {
    const dispatch = useDispatch();
    const name = useSelector((s: RootState) => s.user.name ?? "Admin");
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-bold">Panel de Administración</h2>
            <ExternalWidget title="Métricas" />
            <div className="flex gap-2">
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setName("Ada"))}>Renombrar</button>
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setName(undefined))}>Reset</button>
            </div>
            <p>Nombre actual: {name}</p>
        </div>
    );
}

class AdminFlow implements FlowBase {
    render(): JSX.Element {
        return (
            <Routes>
                <Route path="/" element={<AdminFlowView />} />
            </Routes>
        );
    }
}

/****************************************\
|*  6) User Flow con flujo interno       *|
\****************************************/

function StepRegisterProduct({ onNext }: any) {
    const dispatch = useDispatch();
    const [name, setLocalName] = useState("");
    return (
        <div>
            <h3 className="font-semibold">Registrar Producto</h3>
            <input
                className="border rounded px-2 py-1"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setLocalName(e.target.value)}
            />
            <button
                className="ml-2 rounded bg-blue-500 px-3 py-1 text-white"
                onClick={() => {
                    dispatch(setName(name));
                    dispatch(enableStep(1));
                    onNext();
                }}
                disabled={!name}
            >
                Guardar y continuar
            </button>
        </div>
    );
}

function StepRegisterComponents({ onNext }: any) {
    const dispatch = useDispatch();
    return (
        <div>
            <h3 className="font-semibold">Registrar Componentes</h3>
            <ExternalWidget title="Lista de Componentes" />
            <button
                className="rounded bg-green-600 px-3 py-1 text-white"
                onClick={() => {
                    dispatch(enableStep(2));
                    onNext();
                }}
            >
                Continuar
            </button>
        </div>
    );
}

function StepPrintLabel({ onNext }: any) {
    const dispatch = useDispatch();
    return (
        <div>
            <h3 className="font-semibold">Imprimir Etiqueta</h3>
            <ExternalWidget title="Vista previa de etiqueta" />
            <button
                className="rounded bg-yellow-500 px-3 py-1 text-white"
                onClick={() => {
                    dispatch(enableStep(3));
                    onNext();
                }}
            >
                Imprimir y continuar
            </button>
        </div>
    );
}

function StepQualityCheck() {
    const name = useSelector((s: RootState) => s.user.name ?? "Producto");
    return (
        <div>
            <h3 className="font-semibold">Validación de Calidad</h3>
            <p className="opacity-80">Producto <b>{name}</b> validado correctamente ✅</p>
            <ExternalWidget title="Reporte final" />
        </div>
    );
}

function UserFlowView() {
    const steps = useSelector((s: RootState) => s.user.steps.filter((s) => s.enabled));
    const [stepIndex, setStepIndex] = useState(0);

    const StepComponents = [
        StepRegisterProduct,
        StepRegisterComponents,
        StepPrintLabel,
        StepQualityCheck,
    ];

    const CurrentStep = StepComponents[steps[stepIndex].id];

    const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    const back = () => setStepIndex((i) => Math.max(i - 1, 0));

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Flujo de Producción</h2>
            <p className="opacity-70">Paso actual: {steps[stepIndex].name}</p>
            <div className="border rounded-xl p-4">
                <CurrentStep onNext={next} onBack={back} />
            </div>
            <div className="flex justify-between pt-2">
                <button onClick={back} disabled={stepIndex === 0} className="rounded-lg border px-3 py-2">⬅️ Anterior</button>
                <button onClick={next} disabled={stepIndex === steps.length - 1} className="rounded-lg border px-3 py-2">Siguiente ➡️</button>
            </div>
        </div>
    );
}

class UserFlow implements FlowBase {
    render(): JSX.Element {
        return (
            <Routes>
                <Route path="/" element={<UserFlowView />} />
            </Routes>
        );
    }
}

/****************************************\
|*  7) Factory y App principal            *|
\****************************************/

function createFlow(role: Role): FlowBase {
    switch (role) {
        case "admin":
            return new AdminFlow();
        case "user":
            return new UserFlow();
        default:
            return new GuestFlow();
    }
}

function RoleSwitcher() {
    const dispatch = useDispatch();
    const role = useSelector((s: RootState) => s.user.role);
    return (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-gray-800 p-3 shadow-sm">
            <span className="text-sm opacity-70">Rol actual:</span>
            <span className="rounded-full bg-gray-600 px-3 py-1 text-sm font-medium">{role}</span>
            <div className="ml-auto flex gap-2">
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setRole("guest"))}>Guest</button>
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setRole("user"))}>User</button>
                <button className="rounded-lg border px-3 py-2" onClick={() => dispatch(setRole("admin"))}>Admin</button>
            </div>
        </div>
    );
}

/****************************************\
|*  8) Panel de pruebas (Test cases)      *|
\****************************************/

function TestPanel() {
    const dispatch = useDispatch();
    const role = useSelector((s: RootState) => s.user.role);
    const name = useSelector((s: RootState) => s.user.name ?? "-");
    const steps = useSelector((s: RootState) => s.user.steps);
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const logs: string[] = [];
            // Test 1: storage API disponible
            try {
                const hasSet = typeof (storage as any).setItem === "function";
                const hasGet = typeof (storage as any).getItem === "function";
                const hasRem = typeof (storage as any).removeItem === "function";
                logs.push(hasSet && hasGet && hasRem ? "✅ Test 1: storage OK" : "❌ Test 1: storage incompleto");
            } catch (e) {
                logs.push("❌ Test 1: error verificando storage");
            }

            // Test 2: dispatch + actualización de Redux
            try {
                const prev = name;
                dispatch(setName("__test__"));
                logs.push("✅ Test 2: dispatch ejecutado (verifica UI → name = __test__) ");
                // revertir
                dispatch(setName(prev === "-" ? undefined : prev));
            } catch (e) {
                logs.push("❌ Test 2: dispatch falló");
            }

            // Test 3: pasos condicionales
            try {
                const enabled = steps.filter((s) => s.enabled).length;
                logs.push(enabled >= 1 ? "✅ Test 3: al menos un paso habilitado" : "❌ Test 3: sin pasos habilitados");
            } catch (e) {
                logs.push("❌ Test 3: error leyendo pasos");
            }

            setResults(logs);
        })();
    }, []);

    return (
        <div className="rounded-xl border p-3 text-left">
            <h4 className="font-semibold mb-2">Tests rápidos</h4>
            <ul className="list-disc pl-5 space-y-1">
                {results.map((r, i) => (
                    <li key={i}>{r}</li>
                ))}
            </ul>
            <div className="mt-3 text-sm opacity-70">Estado actual → role: <b>{role}</b>, name: <b>{name}</b></div>
        </div>
    );
}

function AppContent() {
    const role = useSelector((s: RootState) => s.user.role);
    const flow = createFlow(role);
    return (
        <div className="mx-auto max-w-3xl space-y-6 p-6">
            <h1 className="text-center text-3xl font-bold">React + Redux + Persist (seguro) + Flujos Dinámicos</h1>
            <RoleSwitcher />
            <TestPanel />
            <div key={role} className="rounded-2xl border bg-gray-800 p-6 shadow-sm">
                {flow.render()}
            </div>
            <footer className="pt-4 text-center text-sm opacity-60">
                Estado y pasos persistidos con un storage compatible con sandbox/SSR.
            </footer>
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
                <AppContent />
            </PersistGate>
        </Provider>
    );
}

export default App;
