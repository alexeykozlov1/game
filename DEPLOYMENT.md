# How to Deploy Your Game to GitHub Pages

## Step-by-Step Instructions

### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository: https://github.com/alexeykozlov1/game
2. Click on the **"Settings"** tab at the top of the repository page
   - It's located in the horizontal menu bar (Code, Issues, Pull requests, Actions, Projects, Wiki, Security, Insights, **Settings**)

### Step 2: Access Pages Settings

1. In the left sidebar of the Settings page, scroll down and click on **"Pages"**
   - It's under the "Code and automation" section
   - The full URL should be: https://github.com/alexeykozlov1/game/settings/pages

### Step 3: Configure GitHub Pages Source

1. You'll see a section titled **"Build and deployment"**
2. Under **"Source"**, you'll see a dropdown menu with options:
   - "Deploy from a branch" (OLD METHOD - DON'T USE THIS)
   - **"GitHub Actions"** (NEW METHOD - USE THIS ONE)
3. **Select "GitHub Actions"** from the dropdown
4. Click the **"Save"** button

### Step 4: Verify the Workflow Runs

1. After saving, go to the **"Actions"** tab in your repository
   - URL: https://github.com/alexeykozlov1/game/actions
2. You should see a workflow run called **"Deploy to GitHub Pages"**
3. Click on it to see the progress
4. Wait for it to complete (usually takes 1-2 minutes)
   - You'll see a green checkmark ✅ when it's done
   - If there's a red X ❌, click on it to see what went wrong

### Step 5: Access Your Game

1. Once the workflow completes successfully, your game will be live at:
   - **https://alexeykozlov1.github.io/game/**
2. It may take a few minutes for the site to be accessible after the first deployment
3. You can also find the URL in:
   - Repository Settings → Pages → "Visit site" button at the top

## Troubleshooting

### If you see a 404 error:
- Make sure you selected "GitHub Actions" (not "Deploy from a branch")
- Wait a few minutes after the workflow completes (DNS propagation can take time)
- Check the Actions tab to ensure the workflow completed successfully

### If the workflow fails:
- Click on the failed workflow run
- Check the error messages in the logs
- Common issues:
  - Missing files (should be fixed with the updated workflow)
  - Permission issues (should be resolved with the workflow permissions)

### If you don't see the "GitHub Actions" option:
- Make sure you're using a recent version of GitHub
- The repository must be public, or you need a GitHub Pro/Team account for private repos
- Try refreshing the page

## What Happens Next

After you enable GitHub Actions as the source:
- Every time you push code to the `main` branch, the workflow will automatically run
- Your game will be automatically updated on GitHub Pages
- No manual deployment needed!

## Need Help?

If you're still having issues:
1. Check the Actions tab for error messages
2. Verify all game files are in the repository (index.html, game.js, style.css, images)
3. Make sure the workflow file exists at: `.github/workflows/deploy.yml`

