import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
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
                <Link
                  to="/all-classes"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  All classes
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-enroll-class"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  Enrolled Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-lightGray underline hover:text-primaryColor"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-span-1">
            <h3 className="text-lg text-primaryColor font-semibold mb-4">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
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
            <form className="flex flex-col items-center">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md text-darkGray"
                required
              />
              <button
                type="submit"
                className="w-full bg-primaryColor text-offWhite px-4 py-2 mt-2 rounded-md hover:bg-primaryAccent"
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
