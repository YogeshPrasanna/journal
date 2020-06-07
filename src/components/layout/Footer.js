import React from "react";

export default function Footer() {
    return (
        <div>
            <footer className="bg-dark text-white p-2 text-center">
                Copyright &copy; {new Date().getFullYear()} Journal
            </footer>
        </div>
    );
}
