import{t as e}from"./copy.BgI2XOFd.js";var t=e=>`You are helping me make something for Viewpoint, a mod for Project Zomboid: an addon (Java), a resource pack or a Shaderpack. Its documentation is written so that you can read it.

1. Read ${e}llms.txt first. It lists every page with one line on what the page holds.
2. Read the pages that the task needs. Each page is plain Markdown, and its links lead to other Markdown pages. ${e}llms-full.txt is the whole site in one file.
3. The API version is 1.0. Trust these pages over what you remember. Use only the classes, methods and descriptor keys that they name, and if they do not cover something, tell me instead of guessing. The pages in the group Planned describe what is not available yet.
4. Start from the smallest addon on the Getting started page, and tell me how to check the result in game.

If I have not told you yet what I want to make, ask me.`;for(let n of document.querySelectorAll(`[data-vp-copy-prompt]`)){let r=new URL(n.dataset.vpCopyPrompt,location.href).href;n.addEventListener(`click`,()=>e(n,async()=>t(r)))}