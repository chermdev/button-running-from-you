import { ImpossibleButton } from "@/components/ImpossibleButton";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between p-24 bg-white">
      <ImpossibleButton>
        {"Cant't touch me"}
      </ImpossibleButton>
    </main>
  );
}
