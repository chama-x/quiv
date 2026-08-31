# Charmbracelet VHS Demo Script for quiv
# Run `vhs assets/demo.tape` to produce assets/demo.gif and assets/demo.webm

Output assets/demo.gif
Output assets/demo.webm

Set FontSize 16
Set FontFamily "JetBrains Mono"
Set LetterSpacing 0
Set LineHeight 1.4
Set Theme "Catppuccin Mocha"
Set Width 900
Set Height 480
Set Padding 20
Set Framerate 60

# 1. Start session
Sleep 600ms
Type "bunx quiv list --tier features"
Sleep 300ms
Enter
Sleep 1.8s

# 2. Search for offline sync pattern
Type "bunx quiv find 'offline sync with conflict resolution'"
Sleep 300ms
Enter
Sleep 2s

# 3. Read with progressive disclosure (overview only)
Type "bunx quiv read features/offline-sync --level overview"
Sleep 300ms
Enter
Sleep 2.5s

# 4. Use in a project
Type "bunx quiv use features/offline-sync --project erp-mobile-app"
Sleep 300ms
Enter
Sleep 3s
