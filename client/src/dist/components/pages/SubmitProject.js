import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
export default function SubmitProject() {
    useEffect(() => {
        async function redirectToGForms() {
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.open("https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header", '_blank');
            return;
        }
        redirectToGForms();
    }, []);
    return (_jsxs("div", { children: [_jsx("p", { children: "Redirecting to Google Forms..." }), _jsx("a", Object.assign({ href: "https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header" }, { children: "Click this hyper link if you don't redirect automatically." }))] }));
}
