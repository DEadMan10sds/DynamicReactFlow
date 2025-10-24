import { useState, useEffect, useRef } from "react";

/**
 * Hook para capturar códigos de barras enviados por escáner tipo teclado.
 *
 * @param delay Tiempo (ms) máximo entre teclas para considerar que sigue el mismo escaneo.
 * @param minLength Longitud mínima para considerar que un código es válido.
 * @param onScan Callback opcional que se ejecuta al completar el escaneo.
 *
 * Ejemplo:
 * const { scanned, reset } = useBarcodeScanner(100, 3, code => console.log(code));
 */
export function useBarcodeScanner(
    delay: number = 100,
    minLength: number = 3,
    onScan?: (code: string) => void
) {
    const [scanned, setScanned] = useState<string | null>(null);
    const bufferRef = useRef("");
    const timerRef = useRef<number | null>(null);
    const lastKeyTime = useRef(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const now = Date.now();
            const diff = now - lastKeyTime.current;

            // Reiniciar si hubo una pausa larga
            if (diff > delay) bufferRef.current = "";

            lastKeyTime.current = now;

            if (e.key === "Enter") {
                e.preventDefault();
                if (bufferRef.current.length >= minLength) {
                    setScanned(bufferRef.current);
                    onScan?.(bufferRef.current);
                }
                bufferRef.current = "";
                if (timerRef.current) clearTimeout(timerRef.current);
                return;
            }

            // Solo aceptar caracteres imprimibles
            if (e.key.length === 1) {
                bufferRef.current += e.key;
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                    // Timeout → escaneo terminado
                    if (bufferRef.current.length >= minLength) {
                        setScanned(bufferRef.current);
                        onScan?.(bufferRef.current);
                    }
                    bufferRef.current = "";
                }, delay);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [delay, minLength, onScan]);

    const reset = () => setScanned(null);

    return { scanned, reset };
}
