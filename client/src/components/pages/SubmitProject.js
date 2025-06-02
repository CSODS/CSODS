import React from 'react';
import { useEffect} from 'react';

function SubmitProject() {
    useEffect(() => {
        async function RedirectToGForms(){
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header",
                '_blank'
            );
            return;
        }
        RedirectToGForms();
    });
    return (
        <div>
            <p>Redirecting to Google Forms...</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header">
                Click this hyper link if you don't redirect automatically.
            </a>
        </div>
    );
}

export default SubmitProject;