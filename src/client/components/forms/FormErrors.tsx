import { Alert } from "react-daisyui";

type Props = {
    errors: () => string[];
};

const FormErrors: React.FC<Props> = ({ errors }) => {
    return (
        <>
            {errors().length > 0 && (
                <Alert status="error">
                    <ul className="list-disc list-inside">
                        {errors().map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </Alert>
            )}
        </>
    );
};

export default FormErrors;
