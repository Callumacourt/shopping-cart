import { Oval } from "react-loader-spinner";

const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "120px",
                margin: '20vmin'
            }}
        >
            <Oval
                visible={true}
                height={80}
                color="black"
                ariaLabel="oval-loading"
            />
        </div>
    );
};

export default Loader;