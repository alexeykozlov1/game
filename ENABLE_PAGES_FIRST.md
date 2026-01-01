# ⚠️ IMPORTANT: Enable GitHub Pages FIRST

## The Error You're Seeing

```
Error: Get Pages site failed. Please verify that the repository has Pages enabled 
and configured to build using GitHub Actions
```

This error means **GitHub Pages is not enabled yet** in your repository settings.

## Solution: Enable Pages BEFORE Running the Workflow

### Step 1: Enable GitHub Pages (MUST DO THIS FIRST)

1. **Go to your repository**: https://github.com/alexeykozlov1/game
2. **Click "Settings"** (top menu bar)
3. **Click "Pages"** (left sidebar, under "Code and automation")
4. **Under "Build and deployment"**:
   - Find the **"Source"** dropdown
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **"Save"** button
5. **Wait 10-20 seconds** for GitHub to enable Pages

### Step 2: Verify Pages is Enabled

After saving, you should see:
- A message saying "Your site is ready to be published"
- Or "Your GitHub Pages site is currently being built"
- The "Source" should show "GitHub Actions"

### Step 3: Trigger the Workflow

Once Pages is enabled, you can:

**Option A: Wait for automatic trigger**
- The workflow will automatically run on the next push to `main`
- Or it may run automatically after you enable Pages

**Option B: Manually trigger the workflow**
1. Go to **"Actions"** tab: https://github.com/alexeykozlov1/game/actions
2. Click **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button (top right)
4. Select **"main"** branch
5. Click **"Run workflow"**

### Step 4: Check Workflow Status

1. Go to **"Actions"** tab
2. Click on the running workflow
3. Wait for it to complete (green checkmark ✅)
4. Your game will be live at: **https://alexeykozlov1.github.io/game/**

## Why This Happens

GitHub requires you to:
1. **First** enable Pages in repository settings
2. **Then** the workflow can deploy to Pages

The workflow cannot enable Pages automatically - you must do it manually in the Settings page.

## Still Having Issues?

If after enabling Pages you still get errors:
1. Make sure you selected **"GitHub Actions"** (not "Deploy from a branch")
2. Wait a minute after enabling Pages before running the workflow
3. Check that your repository is **public** (or you have GitHub Pro/Team for private repos)
4. Try refreshing the Settings → Pages page

## Quick Checklist

- [ ] Went to Settings → Pages
- [ ] Selected "GitHub Actions" as Source
- [ ] Clicked "Save"
- [ ] Waited 10-20 seconds
- [ ] Went to Actions tab
- [ ] Workflow is running/completed
- [ ] Game is accessible at https://alexeykozlov1.github.io/game/

