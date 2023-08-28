import { FiYoutube } from 'react-icons/fi';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineSearch } from 'react-icons/ai';

function Footer() {
    return (
        <div className="footer">
            <footer>
                
                <div className="footerdescription">
                    <p>© 23 Blogspot. All rights reserved</p>
                </div>
                
                <div className="footersocials">
                    <FiYoutube size={"2rem"} />
                    <FaFacebookSquare  size={"2rem"} />
                    <AiOutlineInstagram  size={"2rem"} />
                </div>

            </footer>
        </div>
    );
}

export default Footer;