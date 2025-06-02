import ExerciseCardDesktop from "./ExerciseCardDesktop";
import ExerciseCardMobile from "./ExerciseCardMobile";
import { useMediaQuery } from "react-responsive";

type ExerciseCardProps = React.ComponentProps<typeof ExerciseCardDesktop>;

export default function ExerciseCard(props: ExerciseCardProps) {
  const isMobile = useMediaQuery({ maxWidth: 639 }); // Tailwind sm breakpoint

  return isMobile
    ? <ExerciseCardMobile {...props} />
    : <ExerciseCardDesktop {...props} />;
}