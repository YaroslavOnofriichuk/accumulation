import styles from "./Page.module.css";

export function Component() {
    return <section className={styles.page}>
        <h1 className={styles.title}>Yaroslav Onofriichuk, React developer</h1>

        <h2 className={styles.title}>Summary</h2>

        <p>I am a highly skilled JavaScript Developer with a strong background in software development. With 1 year of commercial experience and more than 2 years of overall experience, I have acquired a solid understanding of the development lifecycle and a proven ability to deliver high-quality solutions.</p>

        <h2 className={styles.title}>Contacts</h2>

        <ul>
            <li>Ternopil, Ukraine</li>
            <li>yaroslavonofriichuk@ukr.net</li>
            <li><a href="https://github.com/YaroslavOnofriichuk" target="blank">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/yaroslav-onofriichuk/" target="blank">Linkedin</a></li>
            <li><a href="tel:+380979172450">+380979172450</a></li>
        </ul>

        <h2 className={styles.title}>Tech skills</h2>

        <ul>
            <li>HTML/CSS/SASS</li>
            <li>GIT/GitHub/GitLab</li>
            <li>WebPack/Parcel/Vite</li>
            <li>JavaScript/TypeScript</li>
            <li>React.js/Next.js</li>
            <li>Redux/Redux Toolkit</li>
            <li>REST API</li>
            <li>GraphQL/Apollo Client</li>
            <li>Node.js/Express/NestJS</li>
            <li>SQL/PostgreSQL</li>
            <li>NoSQL/MongoDB</li>
        </ul>

        <h2 className={styles.title}>Soft skills</h2>

        <ul>
            <li>Attention to detail</li>
            <li>Quick learning</li>
            <li>Teamwork</li>
            <li>Stress resistance</li>
        </ul>

        <h2 className={styles.title}>Work Experience</h2>

        <p>Junior Full Stack JavaScript developer. Interbranche GMBH  | Aug 2022 -  present | remote.</p>

        <ul>
            <li>Developed and maintained web applications using modern JavaScript frameworks like React.js.</li>
            <li>Implemented server-side logic and API endpoints using Nest.js, a popular Node.js framework, ensuring efficient data flow and scalability.</li>
            <li>Utilized PostgreSQL for database management, including designing schemas, writing complex queries, and optimizing database performance.</li>
        </ul>
           
    </section>;
}
