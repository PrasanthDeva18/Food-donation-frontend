function Footer() {
    const date = new Date();
    return (
        <footer className="text-center p-2 bg-dark text-white ">
        <p>©{date.getFullYear()} <span className="text-danger">Donation Website</span>, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    )
}

export default Footer;