export default function Footer() {
  const currentYear = new Date().getFullYear(); // Gets the current year dynamically

  return (
    <footer className="bg-[#FFE0E6] text-[#9E3E4E] p-6 text-center">
      <div className="container mx-auto">
        <p className="text-sm">© {currentYear} Summatrix. All rights reserved.</p>
        <p className="text-sm mt-1">
          <a href="/privacy-policy" className="hover:underline mx-2">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline mx-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}