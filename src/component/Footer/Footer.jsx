import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-darkGray text-offWhite py-10">
      <div className="container mx-auto text-center sm:text-left">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
          {/* Logo & Description */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-primaryColor">
              EduTrial
            </h2>
            <p className="text-lightGray">
              Your gateway to quality education. Join now and start learning
              from the best instructors around the world.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h3 className="text-lg text-primaryColor font-semibold mb-4">
              Quick Links
            </h3>
            <ul>
              <li>
                <a
                  href="/about"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-span-1">
            <h3 className="text-lg text-primaryColor font-semibold mb-4">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-left space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-offWhite hover:text-primaryColor text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-offWhite hover:text-primaryColor text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-offWhite hover:text-primaryColor text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-offWhite hover:text-primaryColor text-2xl" />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-lightGray mb-4">
              Subscribe to our newsletter for the latest updates, courses, and
              events.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-2/3 px-4 py-2 rounded-l-md text-darkGray"
                required
              />
              <button
                type="submit"
                className="w-1/3 bg-primaryColor text-offWhite px-4 py-2 rounded-r-md hover:bg-primaryAccent"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-muted mt-8 pt-4">
          <p className="text-center text-sm text-lightGray">
            &copy; {new Date().getFullYear()} EduTrial. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
