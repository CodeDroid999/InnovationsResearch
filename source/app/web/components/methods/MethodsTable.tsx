import React from 'react';

const MethodsTable = () => {
    return (
        <table className="table-auto border-collapse w-full">
            <thead className="bg-black text-white">
                <tr className="text-center">
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Methods</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">File</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Buy Now</th>
                </tr>
            </thead>
            <tbody className="bg-black text-white">
                {/* Repeat the following table row for each payment history */}
                <tr className="text-center">
                    <td className="py-2 px-4 border-2 border-gray-100">
                        <input className="border-none bg-transparent text-center text-chartreuse" type="text" value="Method" name="title" />
                    </td>
                    <td className="py-2 px-4 border-2 border-gray-100">
                        <input className="border-none bg-transparent text-center text-chartreuse" type="text" value="TAX REFUND" name="description" />
                    </td>
                    <td className="py-2 px-4 border-2 border-gray-100">
                        $<input className="border-none bg-transparent text-center text-chartreuse" type="text" name="price" value="120" />
                    </td>
                    <td className="py-2 px-4 border-2 border-gray-100">
                        <button className="btn btn-sm btn-primary">PDF <i className="fas fa-book"></i></button>
                    </td>
                    <td className="py-2 px-4 border-2 border-gray-100">
                        <label className="btn text-white bg-red-500 rounded px-2 py-1">AVAILABLE</label>
                    </td>
                    <td className="py-2 px-4 border-2 border-gray-100">
                        <button type="submit" className="btn text-dark bg-greenyellow"><i className="fa fa-shopping-cart"></i> Purchase</button>
                    </td>
                </tr>
                {/* End of table row */}
            </tbody>
        </table>
    );
};

export default MethodsTable;
