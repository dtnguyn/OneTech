import React from "react";
import { View } from "react-native";
import ProblemItem from "../components/deviceDetail/ProblemItem";

interface Props {}

const SolutionScreen: React.FC<Props> = ({}) => {
  return (
    <View>
      {/* <ProblemItem
        problem={item}
        clickAction={(problemId) => navigation.push("Solution", { problemId })}
        starred={isStarred(item.stars!)}
        toggleStar={handleToggleProblemStar}
        updatePost={(problem) => {
          navigation.push("Compose", {
            header: "Update problem",
            title: problem.title,
            content: problem.content,
            category: category,
            onCompose: (title, content, _rating, images) => {
              handleEditProblem(problem.id, title, content, images);
            },
          });
        }}
        deletePost={(problem) => {
          createAlert("Delete post", "Do you want to delete this post?", () => {
            handleDeleteProblem(problem.id, []);
          });
        }}
        reportPost={(problem) => {
          navigation.push("Compose", {
            header: "Report",
            title: "",
            content: "",
            category: category,
            onCompose: (title, content, _rating, _images) => {
              handleCreateReport(problem.id, title, content);
            },
          });
        }}
      /> */}
    </View>
  );
};

export default SolutionScreen;
