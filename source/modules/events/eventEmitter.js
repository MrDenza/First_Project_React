import { EventEmitter } from "events";

let eventFlow = new EventEmitter();

export { eventFlow };

// https://nodejs.org/dist/v11.13.0/docs/api/events.html
// classComp {
//     let func = () => {...};
//     componentDidMount = () => { // подписываемся
//         eventFlow.on("event", func); // подписываемся и реакция на событие
//     };
//     componentWillUnmount = () => { // отписываемся
//         eventFlow.off("event", func); // отписывается от события
//     }
//     eventFlow.emit("event"); // выпускаем событие
// }
// funcComp {
//     let func = () => {...};
//     useEffect(() => {
//         eventFlow.on("event", func)
//         return () => {
//             eventFlow.off("event", func)
//         }
//     });
//     eventFlow.emit("event"); // выпускаем событие
// }
