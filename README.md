# SE_Project
###  To keep our Project  organized, we’re going to break our work into branches

### Main Branch (`main`)
- The `main` branch contains the **stable, “final code”**. 
- Only code that has been thoroughly tested and is ready for deployment will be merged here.
- Merges into `main` will happen after all testing is complete and any necessary reviews have been conducted.

### Development Branch (`dev`)
- The `dev` branch serves as the **integration branch** for ongoing development.
- This branch contains code that is currently being worked on, which may include features that are not yet fully tested or completed.
- we will merge our feature branches into `dev` for integration testing.

### Feature Branches
- Each team member is responsible for creating their own **feature branch** to work on a specific feature.
- We have a total of **9 features** in development, with each feature branch named appropriately (e.g., `feature/AddNewStudent`, `feature/GetStudentByID`, etc.).
- After completing work on a feature, you should:
  1. Merge the feature branch into `dev`.
  2. Conduct integration testing within `dev` to ensure that the new feature works correctly with the existing code.

### Workflow Summary
1. **Develop Features**: Each team member develops their assigned feature in their own feature branch.
2. **Merge into `dev`**: Once a feature is complete, you should merge your feature branch into `dev` and ensures everything works together.
3. **Testing in `dev`**: The team tests the combined code in the `dev` branch to identify any issues.
4. **Merge into `main`**: After successful testing and verification, the code from `dev` is merged into `main`, making it production-ready.

