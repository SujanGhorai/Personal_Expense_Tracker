import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Analytics from "./pages/Analytics";
import ExpenseHistory from "./sections/ExpenseHistory";
import NotFoundPage from "./pages/NotFoundPage";
import { ExpensesProvider } from "./context/Context";

function App() {
    // useEffect(() => {
    //     document.addEventListener("contextmenu", (e) => e.preventDefault());
    //     document.addEventListener("keydown", (e) => {
    //         if (
    //             e.key === "F12" ||
    //             (e.ctrlKey && e.shiftKey && e.key === "I") ||
    //             (e.ctrlKey && e.shiftKey && e.key === "C") ||
    //             (e.ctrlKey && e.shiftKey && e.key === "J") ||
    //             (e.ctrlKey && e.key == "U")
    //         ) {
    //             e.preventDefault();
    //         }
    //     });
    // }, []);

    return (
        <BrowserRouter>
            <ExpensesProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Analytics />} />
                        <Route path="/history" element={<ExpenseHistory />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ExpensesProvider>
        </BrowserRouter>
    );
}

export default App;
