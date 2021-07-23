# CloudTruth CLI Action
[CloudTruth GitHub action](https://docs.cloudtruth.com/integrations/github-actions) that installs the [CloudTruth CLI](https://docs.cloudtruth.com/configuration-management/cli-and-api/cloudtruth-cli)

# Example usage
Set the [CloudTruth API Key](https://docs.cloudtruth.com/organization-management/access-tokens) as a secret in your [GitHub repository](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) and call it in the action. 
```
env:
  CLOUDTRUTH_API_KEY: ${{ secrets.CLOUDTRUTH_API_KEY }}
```

Include this Action as a step in your GitHub Action workflow:
```
steps:
    - uses: cloudtruth/cli-action@v2
```

Use ``with: version:`` to install a specific version:
```
steps:
    - uses: cloudtruth/cli-action@v2
      with:
        version: 1.0.0
```
