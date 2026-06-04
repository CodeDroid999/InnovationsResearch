import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/cardshoplogo.png'
import airtaskalogo from 'public/cardshoplogo.png'
import React from 'react'

export default function Footer() {
  return (
    <footer className=" bg-green-900 py-2 w-screen">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4 className="font-semibold md:text-2xl text-gray-100">
              SUBJECTS WE COVER
            </h4>
            <p className="pt-1">
              <Link
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href=""
              >
                Accounting
              </Link>
            </p>
            <p className="pt-1">
              <a
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href=""
              >
                Algebra
              </a>
            </p>
            <p className="pt-1">
              <Link
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="/become-a-tutor"
              >
                Art & Design
              </Link>
            </p>
            <p className="pt-1">
              <a
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="#"
              >
                Article Writing{' '}
              </a>
            </p>
            <p className="pt-1">
              <Link
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="/browse-bookings"
              >
                Biology
              </Link>
            </p>
            <p className="pt-1">
              <a
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="#"
              >
                Business & Finance
              </a>
            </p>
            <p className="pt-1">
              <Link
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="/faq"
              >
                Calculus
              </Link>
            </p>
            <p className="pt-1">
              <a
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="#"
              >
                Chemistry
              </a>
            </p>
            <p className="pt-1">
              <Link
                className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                href="/faq"
              >
                Statistics
              </Link>
            </p>
          </div>

          <div className="col-md-3">
            <h4 className="font-semibold text-green-900">SUBJECTS WE COVER</h4>
            <div className="mt-3 grid space-y-1">
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/how-it-works"
                >
                  Communications
                </Link>
              </p>
              <p className="pt-1">
                <a
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="#"
                >
                  Computer Science
                </a>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/faq"
                >
                  Economics
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/faq"
                >
                  Engineering
                </Link>
              </p>
              <p className="pt-1">
                <a
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="#"
                >
                  Excel{' '}
                </a>
              </p>
              <p className="pt-1">
                <a
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="#"
                >
                  Environmental Science{' '}
                </a>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/blog"
                >
                  Film
                </Link>{' '}
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/contact-us"
                >
                  Foreign Languages
                </Link>
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <h4 className="font-semibold text-green-900">SUBJECTS WE COVER</h4>

            <div className="mt-3 grid space-y-1">
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  Dissertation writing
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  Research paper writing{' '}
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  College essay writing{' '}
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  Resume and Cover letter writing{' '}
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  Coursework help
                </Link>
              </p>
              <p className="pt-1">
                <Link
                  className="inline-flex text-md underline font-extrabold gap-x-2 text-gray-300 hover:text-yellow-400"
                  href="/browse-bookings"
                >
                  All Services
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex flex-col items-center pt-4">
              <Image
                src={airtaskalogo}
                alt="booking"
                className="md:h-[200px] md:w-[100%] h-[40px] w-[40px]"
                id="customfontsize"
              />
              <h4 className="font-semibold text-gray-100 pt-3">
                © 2023 NorthExpress
              </h4>
              <div className="text-gray-100 flex space-x-1 pt-3">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#fcfcfc"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M4.85904 6C6.67396 4.14864 9.20308 3 12.0005 3C14.7979 3 17.327 4.14864 19.1419 6M16.4727 9C15.374 7.7725 13.7774 7 12.0004 7C10.2234 7 8.62687 7.7725 7.52823 9M3.39199 16.571C8.17161 11.8351 15.8855 11.8704 20.6215 16.6501C20.7659 16.7958 20.9059 16.9442 21.0414 17.0952C21.3243 17.4105 21.4658 17.5681 21.5288 17.7917C21.5802 17.9738 21.5733 18.2118 21.5113 18.3906C21.4352 18.6101 21.2653 18.7784 20.9255 19.1151L19.7298 20.2999C19.443 20.5841 19.2996 20.7262 19.1299 20.8008C18.98 20.8667 18.8162 20.8948 18.6529 20.8826C18.468 20.8688 18.2855 20.7826 17.9204 20.6102L15.9673 19.6878C15.5425 19.4872 15.3301 19.3869 15.1924 19.2285C15.0709 19.0889 14.9906 18.9183 14.9604 18.7357C14.9261 18.5286 14.9841 18.301 15.1001 17.8458L15.3402 16.9037C13.2037 16.0897 10.8142 16.0772 8.67073 16.8732L8.9022 17.8174C9.01404 18.2737 9.06997 18.5018 9.03377 18.7085C9.00184 18.8908 8.91997 19.0607 8.79725 19.1992C8.65807 19.3563 8.44477 19.4546 8.01817 19.6513L6.05668 20.5558C5.69003 20.7248 5.50669 20.8094 5.32171 20.8215C5.1583 20.8322 4.99477 20.8026 4.84548 20.7353C4.67646 20.6592 4.53437 20.5158 4.25018 20.2289L3.06537 19.0332C2.72866 18.6934 2.56031 18.5235 2.48628 18.3034C2.42596 18.124 2.42117 17.886 2.47422 17.7043C2.53934 17.4813 2.68224 17.325 2.96804 17.0124C3.10495 16.8626 3.24627 16.7154 3.39199 16.571Z"
                      stroke="#f2eeee"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{' '}
                  </g>
                </svg>
                +254 729 989 494
              </div>
              <div className="text-gray-100 flex space-x-1">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#fcfcfc"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M4.85904 6C6.67396 4.14864 9.20308 3 12.0005 3C14.7979 3 17.327 4.14864 19.1419 6M16.4727 9C15.374 7.7725 13.7774 7 12.0004 7C10.2234 7 8.62687 7.7725 7.52823 9M3.39199 16.571C8.17161 11.8351 15.8855 11.8704 20.6215 16.6501C20.7659 16.7958 20.9059 16.9442 21.0414 17.0952C21.3243 17.4105 21.4658 17.5681 21.5288 17.7917C21.5802 17.9738 21.5733 18.2118 21.5113 18.3906C21.4352 18.6101 21.2653 18.7784 20.9255 19.1151L19.7298 20.2999C19.443 20.5841 19.2996 20.7262 19.1299 20.8008C18.98 20.8667 18.8162 20.8948 18.6529 20.8826C18.468 20.8688 18.2855 20.7826 17.9204 20.6102L15.9673 19.6878C15.5425 19.4872 15.3301 19.3869 15.1924 19.2285C15.0709 19.0889 14.9906 18.9183 14.9604 18.7357C14.9261 18.5286 14.9841 18.301 15.1001 17.8458L15.3402 16.9037C13.2037 16.0897 10.8142 16.0772 8.67073 16.8732L8.9022 17.8174C9.01404 18.2737 9.06997 18.5018 9.03377 18.7085C9.00184 18.8908 8.91997 19.0607 8.79725 19.1992C8.65807 19.3563 8.44477 19.4546 8.01817 19.6513L6.05668 20.5558C5.69003 20.7248 5.50669 20.8094 5.32171 20.8215C5.1583 20.8322 4.99477 20.8026 4.84548 20.7353C4.67646 20.6592 4.53437 20.5158 4.25018 20.2289L3.06537 19.0332C2.72866 18.6934 2.56031 18.5235 2.48628 18.3034C2.42596 18.124 2.42117 17.886 2.47422 17.7043C2.53934 17.4813 2.68224 17.325 2.96804 17.0124C3.10495 16.8626 3.24627 16.7154 3.39199 16.571Z"
                      stroke="#f2eeee"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{' '}
                  </g>
                </svg>
                +254 708 813 608
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row md:justify-between justify-center  border border-white mt-4 px-2 py-2">
        <div className="col-md-6 flex md:justify-between justify-center">
          <p className="text-md text-gray-100 pt-2 text-right">
            © 2023 NorthExpress. All rights reserved.
          </p>
        </div>
        <div className="col-md-6 flex md:items-right justify-center space-x-4 md:space-x-2 md:pt-0 pt-2">
          <a
            className="inline-flex text-sm h-10 w-10  border border-white items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            href="https://www.facebook.com/profile.php?id=100095462311480"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </a>

          <a
            className="inline-flex text-sm h-10 w-10  border border-white items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            href="https://www.instagram.com/airtaska/?igshid=NGExMmI2YTkyZg%3D%3D"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                fill="white"
              ></path>{' '}
            </svg>
          </a>
          <a
            className="inline-flex text-sm h-10 w-10  border border-white items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            href="#"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
          </a>
          <a
            className="inline-flex text-sm h-10 w-10  border border-white items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            href="https://twitter.com/airtaska?t=Z3QCo7Yclx-wZeWSPjjOcQ&s=09"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
