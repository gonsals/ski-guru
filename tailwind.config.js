/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                client: "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Fclient-background.jpg?alt=media&token=abad9404-a77a-4cb6-8652-7973fd77f403')",
                instructor:
                    "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Finstructor-background.jpg?alt=media&token=131410b0-ccec-4400-b4dc-3ce8c07fc090')",
                ski: "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Fski.jpg?alt=media&token=0c150d5f-97fa-467e-87f6-88b7b94b87c1')",
                snow: "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Fsnow.jpg?alt=media&token=91113ce5-bd90-469d-bc14-8d114c663a29')",
                ski_snow:
                    "url('https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/OnBoarding%2Fski-snow.jpg?alt=media&token=ab9d1b0a-4085-4a14-8495-172daf119963')",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
