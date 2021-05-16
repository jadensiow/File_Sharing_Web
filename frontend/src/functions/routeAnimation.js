// export const routeTransition = {
//   hidden: {
//     scale: 0,
//   },

//   show: {
//     scale: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },

//   exit: {
//     scale: 0,
//     transition: {
//       duration: 0.5,
//     },
//   },
// };
export const mainRouteTransition = {
  hidden: {
    x: "+300vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 2,
    },
  },

  exit: {
    x: "-300vw",
    transition: {
      duration: 1.5,
    },
  },
};

export const registerRouteTransition = {
  hidden: {
    x: "+300vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 3,
    },
  },

  exit: {
    x: "-300vw",
    transition: {
      duration: 2.4,
    },
  },
};
export const loginRouteTransition = {
  hidden: {
    x: "-300vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 2.4,
    },
  },

  exit: {
    x: "300vw",
    transition: {
      duration: 2.4,
    },
  },
};

export const homeRouteTransition = {
  hidden: {
    x: "-300vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 2,
    },
  },

  exit: {
    x: "-300vw",
    transition: {
      duration: 2.4,
    },
  },
};

export const channelRouteTransition = {
  hidden: {
    x: "+300vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 2.4,
    },
  },

  exit: {
    y: "+300vw",
    transition: {
      duration: 3,
    },
  },
};

export const watchVideoRouteTransition = {
  hidden: {
    x: "+300",
  },

  show: {
    x: 0,
    transition: {
      duration: 2,
    },
  },

  exit: {
    y: "+300",
    transition: {
      duration: 3,
    },
  },
};

export const uploadVidRouteTransition = {
  hidden: {
    x: "+300",
  },

  show: {
    x: 0,
    transition: {
      duration: 3,
    },
  },

  exit: {
    y: "+300",
    transition: {
      duration: 2.4,
    },
  },
};
export const profileRouteTransition = {
  hidden: {
    x: "+300",
  },

  show: {
    x: 0,
    transition: {
      duration: 2.8,
    },
  },

  exit: {
    x: "-300",
    transition: {
      duration: 2.4,
    },
  },
};

export const searchRouteTransition = {
  hidden: {
    x: "+300",
  },

  show: {
    x: 0,
    transition: {
      duration: 2,
    },
  },

  exit: {
    x: "-300",
    transition: {
      duration: 2.4,
    },
  },
};
