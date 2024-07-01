/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                client: "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Fclient-background.jpg?alt=media&token=abad9404-a77a-4cb6-8652-7973fd77f403')",
                instructor:
                    "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Finstructor-background.jpg?alt=media&token=131410b0-ccec-4400-b4dc-3ce8c07fc090')",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
