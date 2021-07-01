# CloudTruth CLI Action
[CloudTruth GitHub action](https://docs.cloudtruth.com/integrations/github-actions) that installs the [CloudTruth CLI](https://docs.cloudtruth.com/configuration-management/cli-and-api/cloudtruth-cli)

# Example usage
Include this Action as a step in your GitHub Action workflow:
```
steps:
    - uses: cloudtruth/cli-action@v1
```

Use ``with: version:`` to install a specific version:
```
steps:
    - uses: cloudtruth/cli-action@v1
      with:
        version: 0.5.4
```
