import React from 'react';
import Link from 'next/link'

const RulesComponent = () => {
    return (
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
            <div className="dashboard_graph bg-teal-800 mx-4">

                <div className="row x_title">
                    <div className="col-md-6">
                        <h2 className="text-red-500 pl-4 pb-2 font-bold">RULES</h2>
                    </div>
                </div>
                <div className="row bg-amber-500 p-1 rounded"></div>

                <div className="clearfix"></div>

                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow bg-amber-500 alert-warning block md:md:p-8 p-4 p-4">
                    1. We are not responsible for any illegal activities. Please use Account Logins Purchase on Darklogs wisely for total anonymity.
                </h2>
                <p></p>
                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow  block md:p-8 p-4 bg-black">
                    2. Minimum Balance should not be less than $70.00 for first timers in order to activate your account with us and able to purchase products that has a minimum range of the required minimum deposit.
                </h2>
                <p></p>
                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow bg-green-500 alert-success block md:p-8 p-4">
                    3. With every $500.00 deposit you will receive 20% bonus.
                </h2>
                <p></p>
                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow  bg-red-500 alert-danger block md:p-8 p-4">
                    4. Do not share account information bought on Darklogs to a reseller or vendors to avoid killing the log or getting banned completly.
                </h2>
                <p></p>
                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow bg-blue-500 alert-info block md:p-8 p-4">
                    5. All user accounts inactive for 3 weeks will be deleted permamently.
                </h2>
                <p></p>
                <br />
                <p></p>
                <h2 className="alert mx-4 rounded shadow  bg-green-900 alert-primary block md:p-8 p-4">
                    6. Kindly report bad tools or logins via the <Link href="https://t.me/">Telegram Channel</Link>
                </h2>
                <br />
                <br />
                <br />
                <p></p>

                <form action="https://crds1.shop/bonus" method="post">
                    <input type="hidden" name="_token" value="TDQOQGRvmU5i3PV1e2uK8NUyVoH08o9c6tUx4J1S" />
                    <button type="submit" id="myBtn" className="bg-red-600 text-white md:p-8 p-4 rounded-md">
                        Apply
                        <br />
                        $25
                        <br />
                        Bonus
                    </button>
                </form>
            </div>

            <section className="custom-social-proof" style={{ display: 'block' }}>
                <div className="custom-notification bg-black text-white">
                    <div className="custom-notification-container">
                        <div className="custom-notification-content-wrapper">
                            <p className="custom-notification-content font-bold" style={{ color: 'red' }}>
                                Someone from <span id="country" style={{ color: 'green' }}>Vir**</span> recently <span id="product">Purchased Cashapp log</span>
                            </p>
                        </div>
                        <div className="custom-close"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RulesComponent;
