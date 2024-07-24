import { NavLink, useLocation } from 'react-router-dom';

const CheckoutSteps = ({ steps }) => {
    const location = useLocation();
    const stepLabels = ['Sign In', 'Shipping', 'Payment', 'Place Order'];
    const stepLinks = ['/login', '/shipping', '/payment', '/placeorder'];

    return (
        <nav className="flex justify-between mb-6">
            {stepLabels.map((label, index) => (
                <li key={index} className="list-none">
                    {steps[index] ? (
                        <NavLink
                            to={stepLinks[index]}
                            className={`${
                                location.pathname === stepLinks[index]
                                    ? 'text-green-600'
                                    : 'text-gray-300'
                            } hover:text-green-600`}
                        >
                            {label}
                        </NavLink>
                    ) : (
                        <span className="text-gray-300">{label}</span>
                    )}
                </li>
            ))}
        </nav>
    );
};

export default CheckoutSteps;
