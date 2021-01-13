import { toast } from 'react-toastify'


const notificationsMiddleware = () => next => action => {
    if (action.successMessage && /(.*)_SUCCESS/.test(action.type)) {
        toast.success(action.successMessage)
    }

    next(action)
}

export default notificationsMiddleware