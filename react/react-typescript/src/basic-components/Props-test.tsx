interface ProfileProps {
  imageId: string;
  name: string;
  profession: string;
  imageSize?: number;
}

function Profile({ imageId, name, profession, imageSize = 70 }: ProfileProps) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={imageId}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="./images/7.png"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
      />
      <Profile
        imageId="./images/24.png"
        name="Katsuko Saruhashi"
        profession="geochemist"
      />
    </div>
  );
}
