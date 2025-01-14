"use client"

export default function Login() {
    return (
        <div className="pt-40 flex items-center justify-center">
            <div className="container max-w-md px-5 mx-auto">
                <form className="bg-[#042A1B] p-8 rounded-3xl shadow-lg border-8 border-[#7AE36A]" action="">
                    <h2 className="text-4xl font-bold mb-6 text-[#fff] text-center">ورود</h2>
                    <div className="mb-4">
                        <label className="block text-[#fff] mb-2" htmlFor="username">نام کاربری</label>
                        <input className="w-full p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7AE36A] transition duration-300" type="text" id="username" name="username" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#fff] mb-2" htmlFor="password">رمز عبور</label>
                        <input className="w-full p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7AE36A] transition duration-300" type="password" id="password" name="password" required />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 form-checkbox text-[#7AE36A] accent-[#7AE36A] transition duration-300" />
                            <span className="ml-2 text-[#fff]">مرا به خاطر بسپار</span>
                        </label>
                    </div>
                    <button className="w-full bg-[#7AE36A] text-[#fff] p-3 rounded hover:bg-[#66d15e] transition duration-300" type="submit">ورود</button>
                </form>
            </div>
        </div>
    );
}
