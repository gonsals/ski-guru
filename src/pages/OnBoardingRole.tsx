import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

const OnboardingRole: React.FC = () => {
    const { setRole, error } = useOnboarding();
    const navigate = useNavigate();

    const handleRoleSelection = (role: string) => {
        setRole(role);
        navigate("/onboarding/sport");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full p-8 bg-white rounded-lg shadow-lg max-w-max">
                <h2 className="text-stone-900 text-base font-normal font-['Outfit'] leading-normal text-center">
                    Create your profile
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-stone-900 text-2xl font-extrabold font-mono leading-loose text-center mb-4">
                    Are you a...?
                </p>
                <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                    <div
                        className="relative w-[343px] h-[249.50px] rounded-[32px] cursor-pointer"
                        onClick={() => handleRoleSelection("client")}
                    >
                        <div className="absolute inset-0 bg-cover bg-center bg-client rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-black/40 rounded-[32px]"></div>
                        <div className="relative flex flex-col justify-center items-center h-full w-full p-4">
                            <div className="text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Client
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative w-[343px] h-[249.50px] rounded-[32px] cursor-pointer"
                        onClick={() => handleRoleSelection("instructor")}
                    >
                        <div className="absolute inset-0 bg-cover bg-center bg-instructor rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-black/40 rounded-[32px]"></div>
                        <div className="relative flex flex-col justify-center items-center h-full w-full p-4">
                            <div className="text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Instructor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingRole;
