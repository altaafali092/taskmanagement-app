import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    return (
        <nav className="flex justify-center mt-6">
            <ul className="inline-flex items-center space-x-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                        preserveScroll
                            href={link.url}
                            className={`px-4 py-2 text-sm rounded-lg ${
                                link.active
                                    ? "bg-purple-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                            } ${!link.url ? "cursor-not-allowed opacity-50" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
