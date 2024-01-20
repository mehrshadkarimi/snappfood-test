import Link from "next/link";

export default function Home() {
  return (
    <main className="center-container">
      <Link href={"/restaurant"} style={{ textDecoration: "none" }}>
        <div className="link">Explore Restaurants</div>
      </Link>
    </main>
  );
}
