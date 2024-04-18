import Navbar from './Navbar';

export default function Header() {
    return (
        <>
            <nav className="navbar pb-4" style={{ backgroundColor: '#212121' }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" style={{ backgroundColor: 'white' }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand link-light">R${}</a>
                    <div className="offcanvas offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body" style={{backgroundColor: '#1b1e20'}}>
                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                                <Navbar />
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}