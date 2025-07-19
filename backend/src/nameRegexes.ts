export     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/g
                            // stary regex  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/
export     const userNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]+(?<![_.])$/g
export     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g