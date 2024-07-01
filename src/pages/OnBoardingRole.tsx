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
        <div className="flex flex-col justify-center items-center bg-blue-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-stone-900 text-base font-normal font-['Outfit'] leading-normal text-center">
                    Create your profile
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-stone-900 text-2xl font-extrabold font-mono leading-loose text-center mb-4">
                    Are you a...?
                </p>
                <div className="flex flex-col gap-4 items-center">
                    <div
                        className="w-[343px] h-[249.50px] p-4 bg-black/opacity-40 rounded-[32px] flex-col justify-center items-center gap-4 inline-flex bg-client bg-cover"
                        onClick={() => handleRoleSelection("client")}
                    >
                        <div className="flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
                                Client
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[343px] h-[249.50px] p-4 bg-black/opacity-40 rounded-[32px] flex-col justify-center items-center gap-4 inline-flex bg-instructor bg-cover bg-center"
                        onClick={() => handleRoleSelection("instructor")}
                    >
                        <div className="flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-100 text-xl font-bold font-['JetBrains Mono'] leading-normal">
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
