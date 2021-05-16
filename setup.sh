# 1. Set-up backend

# From Scratch
# Set-up New EC2 instance - Console > EC2 > Instances > Launch Instance >> Ubuntu 18 > Security groups (allow ssh and TCP (8000) access to your IP address)
# SSH into EC2 instance - ssh -i <path-to-key> ubuntu@<ip-address> - Download https://www.putty.org/
# Install docker - https://docs.docker.com/engine/install/ubuntu/
sudo systemctl start docker
sudo systemctl enable docker
sudo chmod 666 /var/run/docker.sock
# Clone Github Repository

# Updating EC2 instance
# Update local github repository
ssh -i <path-to-key> ubuntu@<ip-address>
# IP will change if ec2 instances stop and start again
# eg ssh -i ./myec2instance-key-pair.pem ubuntu@ec2-54-169-100-12.ap-southeast-1.compute.amazonaws.com
cd File_Sharing_Web
git pull

# Stop Docker container
docker ps # COPY Container ID
docker stop <container-id>

# Push settings.py
# Export environment variables from .env file

# Build Docker image
# this is to run the Dockerfile 
docker build -t file-sharing-backend ./backend
docker run -d -p 8000:8000 --env-file=./backend/.env file-sharing-backend
# to debug can run => docker run -p 8000:8000 --env-file=./backend/.env file-sharing-backend
#without the -d to see error


# To purge all docker image and restart over --> Docker system prune -a
# docker logs <container name> to check if docker start and stop
# docker pps -a to check if container start and stop immediately due to error 



# 2. Start RDS database if not running
# Configure backend/youtubedjango/settings.py database credentials accordingly

# Configure RDS's Security group to allow access to EC2's security group on port 5432

# if mdoel is updated, need to makemigration again. In the settings

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'file-host', 
#         'USER': 'postgres',
#         'PASSWORD': password for postgres RDS,
#         'HOST': 'mydbinstance.cmxtadb5lowk.ap-southeast-1.rds.amazonaws.com',
#         'PORT':'5432',
#     }
# }

# Delete DB and rerun make migration locally in env. Revert back to the following settings in settings.py
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'file-host', 
#         'USER': 'postgres',
#         'PASSWORD': os.environ.get('POSTGRES_PW'),
#         'HOST': 'mydbinstance.cmxtadb5lowk.ap-southeast-1.rds.amazonaws.com',
#         'PORT':'5432',
#     }
# }
# Then stop any docker and try again with step 1


# 3. Set-up Frontend
# https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
# Update API URL in package.json file
npm install
npm run build
aws s3 sync ./frontend/build s3://file-sharing-webapp/

