import {logger} from './logger';


const handleInfo = (message: string) => {
    logger.info(message);
}

const handleError = (error: Error) => {
    logger.error(error.message);
}

export {handleInfo, handleError};