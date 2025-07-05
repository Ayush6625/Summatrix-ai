
export const containerVariants = {
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.1,
            delayChildren:0.2,
        }
    }
}

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 15,
            // Remove 'duration' when using type: "spring"
            // duration: 0.8, // <-- Remove this line
        }
    }
}