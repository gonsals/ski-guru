import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

const SignUp: React.FC = () => {
    const { email, setEmail, password, setPassword, setPhoto, error } =
        useOnboarding();
    const navigate = useNavigate();

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/onboarding/role");
    };

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <form
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="mt-1 p-2 border rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        className="mt-1 p-2 border rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handlePhotoChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default SignUp;
