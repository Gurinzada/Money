//STYLES
import styles from "../../styles/Navbar/Navbar.module.scss";

//COMPONENTS
import ListItemLink from "./ListItemLink";

//UTILS
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useEffect } from "react";

//REACT QUERY
import { useLogoutUser } from "../../queries/user";
import { queryClient } from "../../constants/config";

const Navbar = () => {
    const{ setAuth, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { mutate: logoutHandler, isSuccess } = useLogoutUser();

    useEffect(() => {
        if(isSuccess){
            queryClient.removeQueries();
            setAuth(false);
            if(!auth) navigate("auth")
        }
    }, [isSuccess]);

    return (
        <div className={styles.container} data-cy ="containerNav">
            <div className={styles.logo}>
                <Link to="/">
                    <div>Money Tracker</div>
                </Link>
            </div>

            {/* NAV */}
            <nav>
                <ul>
                    {/* HOME */}
                    <ListItemLink url="">
                        <h3 data-cy="irHome">Home</h3>
                    </ListItemLink>

                    {/* CATEGORIES */}
                    <ListItemLink url="categories">
                        <h3 data-cy="irCat">Categorias</h3>
                    </ListItemLink>

                    {/* TRANSACTIONS */}
                    <ListItemLink url="transactions">
                        <h3 data-cy="irTransacao">Transações</h3>
                    </ListItemLink>

                    {/* Wallet */}
                    <ListItemLink url="wallet">
                        <h3>Carteira</h3>
                    </ListItemLink>

                    {/* Profile */}
                    <div className={styles.mobileMenuLinks}>
                        <ListItemLink url="profile">
                            <h3>Perfil</h3>
                        </ListItemLink>
                    </div>

                    {/* Settings */}
                    <div className={styles.mobileMenuLinks}>
                        <ListItemLink url="settings">
                            <h3>Configurações</h3>
                        </ListItemLink>
                    </div>
                    <ListItemLink url="logout" clickHandler={logoutHandler}>
                        <h3 data-cy="logouth3">Logout</h3>
                    </ListItemLink>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;