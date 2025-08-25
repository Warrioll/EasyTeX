export     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/
                            // stary regex  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/
export     const userNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]+(?<![_.])$/
export     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const nameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/