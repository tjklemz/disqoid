import styles from './Header.module.css'

type Props = {
    name: string;
    avatar?: string;
}

function Header({name, avatar}: Props) {
    return <header className={styles.header}>
        <h4>Disqoid</h4>
        <div className={styles.profile}>
            <span>{name}</span>
            {avatar && <img src={avatar} />}
            <a href="/logout" title="Logout">
                <i className="fa-solid fa-right-from-bracket"></i>
            </a>
        </div>
    </header>
}

export { Header }
