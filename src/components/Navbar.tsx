
export const Navbar = ({ children }) => {
    return <>
        <h1 className="p-4 text-4xl font-bold my-5">This is the navbar</h1>
        <div className="p-8">
            {children}
        </div>
    </>
}