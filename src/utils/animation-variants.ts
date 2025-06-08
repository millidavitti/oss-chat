import { cubicBezier, Variants } from "motion/react";

export const fadeInTopVariant: Variants = {
	hidden: {
		transform: "translateY(-24px)",
		opacity: 0,
	},
	visible: { transform: "translateY(0)", opacity: 1 },
};
export const fadeInVariant: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};
export const scaleInVariant: Variants = {
	hidden: {
		transform: "scale(0.90)",
		opacity: 0,
	},
	visible: {
		transform: "scale(1)",
		opacity: 1,
	},
};
export const fadeILeftVariant: Variants = {
	hidden: {
		transform: "translateX(-24px)",
		opacity: 0,
	},
	visible: { transform: "translateX(0)", opacity: 1 },
};
export const fadeInBottomVariant: Variants = {
	hidden: {
		opacity: 0,
		transform: "translateY(40svh)",
		transition: {
			when: "afterChildren",
		},
	},
	visible: {
		transform: "translateY(0)",
		opacity: 1,
		transition: {
			when: "beforeChildren",
		},
	},
};
export const fadeInRightVariant: Variants = {
	hidden: {
		opacity: 0,
		transform: "translateX(24px)",
		transition: {
			when: "afterChildren",
		},
	},
	visible: {
		transform: "translateX(0)",
		opacity: 1,
		transition: {
			when: "beforeChildren",
		},
	},
};
export const modalVariant: Variants = {
	hidden: {
		transform: "translateX(24px)",
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
	visible: {
		transform: "translateX(0)",
		opacity: 1,
		transition: {
			when: "beforeChildren",
			easeing: cubicBezier(0.47, 0.05, 0.18, 1.24),
		},
	},
};
export const listVariant: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
};
export const listItemVariant: Variants = {
	hidden: {
		transform: "translateX(24px)",
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transform: "translateX(0)",
	},
};
