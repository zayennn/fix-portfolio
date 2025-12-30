import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Tilt from 'vanilla-tilt';
import styles from "./hero.module.css";

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const codeSnippetRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) * 0.01,
                y: (e.clientY - window.innerHeight / 2) * 0.01
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Initialize Tilt.js on code snippet
    useEffect(() => {
        if (codeSnippetRef.current) {
            Tilt.init(codeSnippetRef.current, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.5,
                perspective: 1000,
                scale: 1.02,
                transition: true,
                gyroscope: true,
                gyroscopeMinAngleX: -45,
                gyroscopeMaxAngleX: 45,
                gyroscopeMinAngleY: -45,
                gyroscopeMaxAngleY: 45,
            });
        }

        // Cleanup
        return () => {
            if (codeSnippetRef.current && codeSnippetRef.current.vanillaTilt) {
                codeSnippetRef.current.vanillaTilt.destroy();
            }
        };
    }, []);

    const socialLinks = [
        { icon: 'fa-brands fa-instagram', link: 'https://instagram.com/zaayeenn_', color: '#E4405F' },
        { icon: 'fa-brands fa-tiktok', link: 'https://www.tiktok.com/@zaayeen_', color: '#000000' },
        { icon: 'fa-brands fa-github', link: 'https://github.com/zayennn', color: '#181717' },
        { icon: 'fa-brands fa-linkedin', link: 'https://www.linkedin.com/in/elang-atha-zahran-100459220/', color: '#0A66C2' }
    ];

    // Render code lines secara manual tanpa dangerouslySetInnerHTML
    const renderCodeLine = (line) => {
        switch(line.number) {
            case 1:
                return (
                    <code>
                        <span className={styles.keyword}>const</span> developer = <span className={styles.bracket}>&#123;</span>
                    </code>
                );
            case 2:
                return (
                    <code>
                        &nbsp;&nbsp;<span className={styles.property}>name</span><span className={styles.operator}>:</span> <span className={styles.string}>&quot;Elang Atha Zahran&quot;</span><span className={styles.operator}>,</span>
                    </code>
                );
            case 3:
                return (
                    <code>
                        &nbsp;&nbsp;<span className={styles.property}>role</span><span className={styles.operator}>:</span> <span className={styles.string}>&quot;Junior Fullstack Developer&quot;</span><span className={styles.operator}>,</span>
                    </code>
                );
            case 4:
                return (
                    <code>
                        &nbsp;&nbsp;<span className={styles.property}>skills</span><span className={styles.operator}>:</span> <span className={styles.bracket}>[</span>
                    </code>
                );
            case 5:
                return (
                    <code>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>&quot;React.js&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;Laravel&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;JavaScript&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;PHP&quot;</span><span className={styles.operator}>,</span>
                    </code>
                );
            case 6:
                return (
                    <code>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>&quot;Python&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;Flask&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;Django&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;MySQL&quot;</span><span className={styles.operator}>,</span>
                    </code>
                );
            case 7:
                return (
                    <code>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>&quot;Framer Motion&quot;</span><span className={styles.operator}>,</span> <span className={styles.string}>&quot;Tailwind CSS&quot;</span>
                    </code>
                );
            case 8:
                return (
                    <code>
                        &nbsp;&nbsp;<span className={styles.bracket}>]</span><span className={styles.operator}>,</span>
                    </code>
                );
            case 9:
                return (
                    <code>
                        &nbsp;&nbsp;<span className={styles.property}>passion</span><span className={styles.operator}>:</span> <span className={styles.string}>&quot;Creating exceptional digital experiences&quot;</span>
                    </code>
                );
            case 10:
                return (
                    <code>
                        <span className={styles.bracket}>&#125;</span><span className={styles.operator}>;</span>
                    </code>
                );
            case 11:
                return <code></code>;
            case 12:
                return (
                    <code>
                        <span className={styles.console}>console</span><span className={styles.operator}>.</span><span className={styles.method}>log</span><span className={styles.bracket}>(</span><span className={styles.string}>&quot;Let&apos;s build something amazing!&quot;</span><span className={styles.bracket}>)</span><span className={styles.operator}>;</span>
                    </code>
                );
            case 13:
                return (
                    <code>
                        <span className={styles.comment}>// Ready to collaborate?</span>
                    </code>
                );
            case 14:
                return (
                    <code>
                        <span className={styles.keyword}>const</span> <span className={styles.variable}>contact</span> <span className={styles.operator}>=</span> <span className={styles.string}>&quot;athazahranel@gmail.com&quot;</span><span className={styles.operator}>;</span>
                    </code>
                );
            default:
                return <code></code>;
        }
    };

    const codeLines = Array.from({ length: 14 }, (_, i) => i + 1);

    return (
        <section className={styles.section__hero}>
            <div className={styles.hero__container}>
                {/* Content */}
                <motion.div 
                    className={styles.hero__content}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.badge}>
                        <span className={styles.badge__text}>Available for work</span>
                    </div>

                    <motion.h2 
                        className={styles.greeting}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hello, I'm
                    </motion.h2>

                    <motion.h1 
                        className={styles.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        data-cursor="hover"
                    >
                        Elang Atha Zahran
                    </motion.h1>

                    <motion.div 
                        className={styles.title__wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h3 className={styles.title}>
                            <Typewriter
                                words={['Junior Fullstack Developer', 'Web Developer', 'Problem Solver', 'Creative Thinker']}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </h3>
                        <div className={styles.title__underline}></div>
                    </motion.div>

                    <motion.p 
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        data-cursor="hover"
                    >
                        Building exceptional digital experiences with modern web technologies. 
                        Specializing in responsive design, clean architecture, and scalable solutions.
                    </motion.p>

                    <motion.div 
                        className={styles.cta__container}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <a href="#contact" className={styles.primary__btn} data-cursor="hover">
                            Get in Touch
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                        <a href="/projects" className={styles.secondary__btn} data-cursor="hover">
                            View Projects
                        </a>
                    </motion.div>

                    <motion.div 
                        className={styles.social__links}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                className={styles.social__link}
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                data-cursor="hover"
                                style={{ '--hover-color': social.color }}
                            >
                                <i className={social.icon}></i>
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div 
                        className={styles.scroll__indicator}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <span>Scroll Down</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </motion.div>
                </motion.div>

                {/* 3D Code Snippet */}
                <motion.div 
                    className={styles.hero__visual}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    }}
                >
                    <div 
                        ref={codeSnippetRef} 
                        className={styles.code__snippet__wrapper}
                        data-tilt
                        data-tilt-max="15"
                        data-tilt-speed="400"
                        data-tilt-perspective="1000"
                        data-tilt-glare="true"
                        data-tilt-max-glare="0.5"
                        data-cursor="hover"
                    >
                        <div className={styles.code__snippet}>
                            {/* Code Header */}
                            <div className={styles.code__header}>
                                <div className={styles.code__dots}>
                                    <span className={styles.dot} style={{backgroundColor: '#FF5F56'}}></span>
                                    <span className={styles.dot} style={{backgroundColor: '#FFBD2E'}}></span>
                                    <span className={styles.dot} style={{backgroundColor: '#27C93F'}}></span>
                                </div>
                                <span className={styles.code__filename}>portfolio.js</span>
                            </div>
                            
                            {/* Code Content with proper syntax highlighting */}
                            <div className={styles.code__content}>
                                <pre className={styles.code__pre}>
                                    {codeLines.map((lineNumber) => (
                                        <div key={lineNumber} className={styles.code__line}>
                                            <span className={styles.line__number}>
                                                {lineNumber.toString().padStart(2, '0')}
                                            </span>
                                            <div className={styles.line__code}>
                                                {renderCodeLine({ number: lineNumber })}
                                            </div>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>

                        {/* 3D Decorative Elements */}
                        <div className={styles.code__decorations}>
                            <div className={styles.decoration__1}></div>
                            <div className={styles.decoration__2}></div>
                            <div className={styles.decoration__3}></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tech Stack */}
            <motion.div 
                className={styles.tech__stack}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
            >
                <div className={styles.tech__label}>Tech Stack This Portfolio</div>
                <div className={styles.tech__items}>
                    {['React', 'JavaScript', 'CSS3', 'Framer Motion', 'Tilt.js'].map((tech, index) => (
                        <motion.span 
                            key={index}
                            className={styles.tech__item}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                            data-cursor="hover"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default Hero;