import Header from "./Header";
import Navbar from "./Navbar";

export default function MainContainer({ children }) {
    return (
        <>
            <Header />
            <div className="container-fluid pl-0 pr-0 ps-0">
                <div className="row">
                    <div className="col-3 col-xl-3 col-xxl-2 pl-0 pr-0 d-none d-lg-block">
                        <Navbar />
                    </div>
                    <div className="col-12 col-lg-9 col-xl-8 col-xxl-10 pl-0 pr-0 mt-4">
                        <div className="globalcontainer2 mx-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
