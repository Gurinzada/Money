import styles from "../../styles/homeComponents/HomeProfile.module.scss";
import { BsPerson, BsPencil, BsWallet2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

//UTILS
import { useUser } from "../../queries/user";

const HomeProfile = () => {
    const { data } = useUser();
    return (
        <div className={styles.container} data-cy="containerPerfil">
            <div className={styles.iconContainer}>
                <BsPerson />
            </div>
            <div className={styles.info}>
                <span className={styles.welcome}>
                    {data && `Olá ${data?.data.firstName}`}
                </span>
                <div className={styles.options}>
                    <Link to="profile">
                        <span data-cy="perfilName">Perfil</span>
                        <BsPencil />
                    </Link>
                    <Link to="settings">
                        <span>Configurações</span>
                        <IoSettingsOutline />
                    </Link>
                    <Link to="wallet">
                        <span>Carteira</span>
                        <BsWallet2 />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeProfile;