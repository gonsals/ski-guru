import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { login, register } from "../services/authService";

const OnboardingSport: React.FC = () => {
    const { email, password, photo, role, setSport, error } = useOnboarding();
    const navigate = useNavigate();

    const handleSportSelection = async (sportSelection: string) => {
        setSport(sportSelection);

        try {
            await register(
                email,
                password,
                role,
                sportSelection,
                photo || undefined
            );
            console.log("register sport : ", sportSelection);
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error("Failed to complete onboarding and register:", err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full p-8 bg-white rounded-lg shadow-lg max-w-max">
                <h2 className="text-stone-900 text-base font-normal font-['Outfit'] leading-normal text-center">
                    Create your profile
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-stone-900 text-2xl font-extrabold font-mono leading-loose text-center mb-4">
                    Your sport is...?
                </p>
                <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                    <div
                        className="relative w-[343px] h-[162.33px] md:h-[249.50px] rounded-[32px] cursor-pointer"
                        onClick={() => handleSportSelection("ski")}
                    >
                        <div className="absolute inset-0 bg-cover bg-center bg-ski rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-black/40 rounded-[32px]"></div>
                        <div className="relative flex flex-col justify-center items-center h-full w-full p-4">
                            <div className="text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Ski
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative w-[343px] h-[162.33px] md:h-[249.50px] rounded-[32px] cursor-pointer"
                        onClick={() => handleSportSelection("ski")}
                    >
                        <div className="absolute inset-0 bg-cover bg-center bg-snow rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-black/40 rounded-[32px]"></div>
                        <div className="relative flex flex-col justify-center items-center h-full w-full p-4">
                            <div className="text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Snowboard
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative w-[343px] h-[162.33px] md:h-[249.50px] rounded-[32px] cursor-pointer"
                        onClick={() => handleSportSelection("ski-snowboard")}
                    >
                        <div className="absolute inset-0 bg-cover bg-center bg-ski_snow rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-black/40 rounded-[32px]"></div>
                        <div className="relative flex flex-col justify-center items-center h-full w-full p-4">
                            <div className="text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Ski & Snowboard
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingSport;
