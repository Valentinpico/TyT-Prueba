import {
  XMarkIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { TypeToastType } from "../../types/types";
import { useToastTimer } from "./useToastTimer";

const STYLES = {
  success: "bg-green-100 border-green-500 text-green-700",
  error: "bg-red-100 border-red-500 text-red-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
};
const TITLE = {
  success: "¡Éxito!",
  error: "¡Error!",
  info: "Información",
  warning: "Advertencia",
};

const ICONS = {
  success: <CheckBadgeIcon className="w-10 h-10" />,
  error: <XMarkIcon className="w-10 h-10" />,
  info: <InformationCircleIcon className="w-10 h-10" />,
  warning: <ExclamationTriangleIcon className="w-10 h-10" />,
};
type ToastProps = {
  message: string;
  type: TypeToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
};
export const Toast = ({
  message,
  type,
  duration,
  onClose,
  isVisible,
}: ToastProps) => {
  const { handleOnClose } = useToastTimer({ onClose, duration });

  return (
    isVisible && (
      <div
        className={`w-11/12 sm:w-2/5 right-3 bottom-4  z-50 p-4 border-l-4 rounded shadow-md flex items-start space-x-3 ${STYLES[type]} items-center fixed`}
      >
        <div className="flex items-center justify-center w-8 h-8">
          {ICONS[type]}
        </div>

        <div className="flex-1">
          <p className="text-sm font-mono uppercase font-extrabold">
            {TITLE[type]}
          </p>
          <p className="text-sm font-mono">{message}</p>
        </div>

        <button
          onClick={handleOnClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    )
  );
};
